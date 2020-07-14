import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled.a`
  flex: 1;
  margin: 12px;
`;

const StyledFigure = styled.figure`
  height: 100%;
  position: relative;
  margin: 0;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #222 30%, transparent);
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const StyledImg = styled.img`
  width: 80%;
  border-radius: 10px;
  float: right;
`;

const StyledFigcaption = styled.figcaption`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  height: 100%;
  color: #fff;
  padding: 14px 0 14px 20px;
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledH3 = styled.h3`
  font-size: 14px;
`;

const StyledP = styled.p`
  font-size: 12px;
  margin: 0;
`;

const ClassItem = ({ classItem }) => {
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/classes/${id}`, { ...classItem });
  };

  return (
    <StyledLink onClick={() => handleClick(classItem._id)}>
      <StyledFigure>
        <StyledImg
          src={require(`../../images/${classItem.thumbnailSlug}`)}
          alt='class thumbnail'
        />
        <StyledFigcaption>
          <StyledH3>{classItem.title}</StyledH3>
          <div>
            <StyledP>
              Instructor: <strong>{classItem.instructor}</strong>
            </StyledP>
            <StyledP>
              Level: <strong>{classItem.level}</strong>
            </StyledP>
            <StyledP>
              Song: <strong>{classItem.songs}</strong>
            </StyledP>
          </div>
        </StyledFigcaption>
      </StyledFigure>
    </StyledLink>
  );
};

export default ClassItem;
