import { useState } from "react";
import { useEffect } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";
import { useSocketStore } from "../store/useSocketStore";

export const Chat = ({ chatTarget }) => {
  const { messages, getMessage, sendMessage, addMessage } = useMessageStore();
  const { authUser } = useAuthStore();
  const { socket } = useSocketStore();

  const [message, setMessage] = useState({ text: "" });

  //Load old chat
  useEffect(() => {
    if (!chatTarget) return;
    (async () => {
      await getMessage(chatTarget._id);
    })();
  }, [chatTarget, getMessage]);

  // useEffect(() => {
  //   if (!socket) return;
  //   socket.on("newMessage", (data) => {
  //     console.log("newMessage", data);
  //     (async () => {
  //       await addMessage(data);
  //     })();
  //   });
  // }, [addMessage, socket]);

  useEffect(() => {
    if (!socket || !chatTarget) return;

    const handleNewMessage = (data) => {
      // only add if message belongs to current chat
      if (
        data.senderId === chatTarget._id &&
        data.receiverId === authUser._id
      ) {
        addMessage(data);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, chatTarget, authUser._id, addMessage]);

  const handleMessageSubmit = () => {
    if (message.text === "") return;
    (async () => {
      await sendMessage(chatTarget._id, message);
      setMessage({ text: "" });
    })();
  };
  // console.log("messages", messages);
  console.log("chatTarget", chatTarget);

  return (
    <section className=" bg-linear-to-r from-slate-900 to-slate-700 flex-3 flex flex-col   justify-between overflow-y-auto">
      <div className="sticky top-0">
        <h1 className="text-2xl text-white bg-gray-600 p-1 text-center  ">
          {chatTarget?.fullName}
        </h1>
      </div>
      <div>
        <ul className="flex flex-col">
          {messages &&
            messages.map((message) => {
              return (
                <li
                  key={message._id}
                  className={` p-2  m-3 rounded-md max-w-1/2 ${
                    message.senderId === authUser._id
                      ? "self-end bg-blue-400"
                      : "self-start bg-gray-600 text-white"
                  }`}
                >
                  {message.text}
                </li>
              );
            })}
        </ul>
      </div>
      <div className="sticky  bottom-0  border p-2 bg-gray-800 flex gap-2">
        <input
          onChange={(e) => setMessage({ ...message, text: e.target.value })}
          value={message.text}
          className=" flex-4 rounded-md text-white bg-gray-600"
          type="text"
        />
        <button
          onClick={handleMessageSubmit}
          className="flex-1 bg-green-400 active:bg-green-300 p-2 rounded-md"
        >
          Send
        </button>
      </div>
    </section>
  );
};
