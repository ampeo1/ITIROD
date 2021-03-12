using System;
using System.Collections.Generic;
using System.Text;

namespace Laba1
{
    class Message
    {
        public int Id { get; set; }
        public string Text { get; set; }

        public Message(int id, string text)
        {
            Id = id;
            Text = text;
        }

        public Message()
        {
        }
    }
}
