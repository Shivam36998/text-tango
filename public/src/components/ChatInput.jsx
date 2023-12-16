import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // onClick emoji, toggling the showEmojiPicker state variable between false & true
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // onEmojiClick, handleEmojiClick function will execute and updating the msg state variable
  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  // onSubmit the form sendChat function will execute
  const sendChat = event => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={event => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={e => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  align-items: center;
  background-color: #ddd;
  padding: 2rem;
  .button-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.7rem;
        color: #007aff;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #fff;
        box-shadow: 0 2px 6px#007aff;
        border-color: #007aff;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #007aff;
          width: 5px;
          &-thumb {
            background-color: #fff;
            border-radius: 2rem;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(1);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #007aff;
        }
        .emoji-group:before {
          color: #aaa;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: #007aff;
      font-weight: bold;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #007aff;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      cursor: pointer;
      width: 3rem;
      height: 3rem;
      padding: 0.3rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #007aff;
      border: none;
      /*       @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      } */
      svg {
        transform: rotate(-30deg);
        font-size: 1.5rem;
        color: white;
      }
    }
  }
`;
