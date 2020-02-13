import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-wrap: true;
  align-text: left;
  font-size: 14px;
  width: 100%;
`;

export const CardBlock = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  flex-wrap: true;
  width: 100%;
  font-weight: 500;
  border: 1px solid purple;
  border-radius: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  width: auto;
`;

export const UsersContainer = styled.div`
  color: #000;
  margin: 5px;
  height: 1600px;
 `;

export const Loading = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
`;