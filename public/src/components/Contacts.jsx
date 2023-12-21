/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img
              src={Logo}
              alt="logo"
            />
            <h3>Text-Tango</h3>
          </div>
          <div className="contacts">
            {contacts.length &&
              contacts.map((contact, index) => {
                return (
                  <div
                    key={contact._id}
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    onClick={() => changeCurrentChat(index, contact)}>
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt=""
                      />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 9.5% 80.5% 10%;
  overflow: hidden;
  background-color: #0d0d30;
  .brand {
    background-color: #0d0d30;
    display: flex;
    padding: 1.1rem;
    align-items: center;
    gap: 1rem;
    img {
      height: 4rem;
    }
    h3 {
      color: white;
      font-size: 2rem;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #ffffff34;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    align-items: center;
    padding: 1.5rem;
    gap: 1rem;
    .avatar {
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
  }
  .onlineUsers{
    display: flex;
    color: #fff;
    height: 60px;
    align-items: center;
    justify-content: flex-end;
    gap: 5px;
    margin-right: 10px;
    .onlineUsersCheckbox{
      height: 1.5rem;
      width: 1.5rem;
    }
    span{
      display: flex;
      align-items: center;
    }
  }
`;
