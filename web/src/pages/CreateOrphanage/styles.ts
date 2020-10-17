import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface ButtonActive extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  dontOpen?: boolean;
}

export const Container = styled.div`
  display: flex;

  main {
    flex: 1;

    form {
      width: 700px;
      margin: 64px auto;

      background: #ffffff;
      border: 1px solid #d3e2e5;
      border-radius: 20px;

      padding: 64px 80px;

      overflow: hidden;

      fieldset {
        border: 0;
      }

      fieldset + fieldset {
        margin-top: 80px;
      }

      fieldset legend {
        width: 100%;

        font-size: 32px;
        line-height: 34px;
        color: #5c8599;
        font-weight: 700;

        border-bottom: 1px solid #d3e2e5;
        margin-bottom: 40px;
        padding-bottom: 24px;
      }

      label {
        display: flex;
        color: #8fa7b3;
        margin-bottom: 8px;
        line-height: 24px;
      }

      label span {
        font-size: 14px;
        color: #8fa7b3;
        margin-left: 24px;
        line-height: 24px;
      }
    }
  }
`;

export const InputBlock = styled.div`
  input,
  textarea {
    width: 100%;
    background: #f5f8fa;
    border: 1px solid #d3e2e5;
    border-radius: 20px;
    outline: none;
    color: #5c8599;
  }

  input {
    height: 64px;
    padding: 0 16px;
  }

  input[type='file'] {
    display: none;
  }

  textarea {
    min-height: 120px;
    max-height: 240px;
    resize: vertical;
    padding: 16px;
    line-height: 28px;
  }

  .images-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 16px;

    img {
      width: 100%;
      height: 96px;
      object-fit: cover;
      border-radius: 20px;
    }
  }

  .new-image {
    height: 96px;
    background: #f5f8fa;
    border: 1px dashed #96d2f0;
    border-radius: 20px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ConfirmButton = styled.button`
  margin-top: 64px;

  width: 100%;
  height: 64px;
  border: 0;
  cursor: pointer;
  background: #3cdc8c;
  border-radius: 20px;
  color: #ffffff;
  font-weight: 800;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;

  svg {
    margin-right: 16px;
  }

  &::hover {
    background: #36cf82;
  }
`;

export const ContainerButtonSelect = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const ButtonSelect = styled.button<ButtonActive>`
  height: 64px;
  background: ${props => (props.active ? '#edfff6' : '#f5f8fa')};
  border: 1px solid ${props => (props.active ? '#a1e9c5' : '#d3e2e5')};
  color: ${props => (props.active ? '#37c77f' : '#5c8599')};
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${props =>
    props.dontOpen
      ? css`
          border-radius: 0 20px 20px 0;
          border-left: 0;
        `
      : css`
          border-radius: 20px 0px 0px 20px;
        `}
`;
