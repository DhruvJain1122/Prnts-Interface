import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  align-content: center;
  justify-items: center;
`;

export const Preview = styled.div`
  height: 150px;
  width: 150px;
  border-radius: 150px;
  background: #e9eff0;
  box-shadow: 5px 5px 12px #dbe1e2, -5px -5px 12px #f7fdfe;
  margin: 20px 10px;
  display: grid;
  align-items: center;
  justify-items: center;

  img {
    max-height: 150px;
    max-width: 150px;
    border-radius: 1000px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const Text = styled.div`
  color: grey;
  position: relative;
`;

export const UploadButton = styled.div`
  margin: 5px 0px 20px 0px;
  font-size: 12px;
  font-weight: bold;
`;
