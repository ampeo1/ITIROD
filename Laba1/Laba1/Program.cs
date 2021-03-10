using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace Laba1
{
    class Program
    {
        private const string ip = "127.0.0.1";
        private static User user;
        private static Socket udpSocket;
        public static void Main()
        {
            InitUser();
            Connect();
            Messaging();
        }

        private static void InitUser()
        {
            user = new User();
            Console.WriteLine("Username:");
            user.Username = Console.ReadLine();
            Console.WriteLine("My port:");
            user.MyPort = int.Parse(Console.ReadLine());
            Console.WriteLine("Recipient port:");
            user.RecipientPort = int.Parse(Console.ReadLine());
            Console.Clear();
        }

        private static void Connect()
        {
            Socket tcpSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            tcpSocket.Bind(new IPEndPoint(IPAddress.Parse(ip), user.MyPort));

            bool key = true;
            while (key)
            {
                try
                {
                    tcpSocket.Connect(new IPEndPoint(IPAddress.Parse(ip), user.RecipientPort));
                    key = false;
                }
                catch (SocketException)
                {
                    Thread.Sleep(10);
                    Console.WriteLine("Waiting for connection");
                }
            }

            Console.WriteLine("Successful connection");
        }

        private static void Messaging()
        {
            int id_message = 0;
            try
            {
                udpSocket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
                Task listenMessage = new Task(GetMessages);
                listenMessage.Start();
                while (true)
                {
                    StringBuilder text = new StringBuilder(user.Username);
                    text.Append(": ");
                    text.Append(Console.ReadLine());
                    Message message = new Message(id_message, text.ToString());
                    id_message++;

                    byte[] data = Encoding.Unicode.GetBytes(JsonSerializer.Serialize<Message>(message));
                    udpSocket.SendTo(data, new IPEndPoint(IPAddress.Parse(ip), user.RecipientPort));
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                Close();
            }
        }

        private static void GetMessages()
        {
            Stack<Message> stk = new Stack<Message>();
            int prev_id = -1;
            try
            {
                udpSocket.Bind(new IPEndPoint(IPAddress.Parse(ip), user.MyPort));

                while (true)
                {
                    StringBuilder json = new StringBuilder();
                    int bytes = 0;
                    byte[] data = new byte[256];

                    EndPoint endPoint = new IPEndPoint(IPAddress.Parse(ip), user.RecipientPort);

                    do
                    {
                        bytes = udpSocket.ReceiveFrom(data, ref endPoint);
                        json.Append(Encoding.Unicode.GetString(data, 0, bytes));
                    } while (udpSocket.Available > 0);

                    Message message = JsonSerializer.Deserialize<Message>(json.ToString());
                    CheckMessage(stk, message, ref prev_id);
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                Close();
            }
        }

        private static void CheckMessage(Stack<Message> stk, Message message, ref int prev_id)
        {
            if (stk.Count == 0 && prev_id + 1 == message.Id)
            {
                Console.WriteLine(message.Text);
                prev_id++;
            }
            else
            {
                if (stk.Peek().Id == message.Id + 1)
                {
                    Console.WriteLine(message.Text);
                    int prev = message.Id;
                    while (stk.Count != 0 && prev == stk.Peek().Id - 1)
                    {
                        prev = stk.Peek().Id;
                        Console.WriteLine(stk.Pop().Text);
                    }
                }
                else
                {
                    stk.Push(message);
                    stk.OrderByDescending(mes => mes.Id);
                }
            }
        }

        private static void Close()
        {
            if (udpSocket != null)
            {
                udpSocket.Shutdown(SocketShutdown.Both);
                udpSocket.Close();
                udpSocket = null;
            }
        }
    }
}
