import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import styled from 'styled-components';

const StyledLink = styled.a`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 10px;
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
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const StyledImg = styled.img`
  width: 80%;
  float: right;
`;

const StyledFigcaption = styled.figcaption`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  color: #fff;
  padding: 14px 20px;
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

const StyledProgressBar = styled.div`
  flex: 0 0 auto;
  height: 10px;
  background: #444;

  &:before {
    content: '';
    display: block;
    width: ${(props) => props.progressBar};
    height: 100%;
    background: #0a78fb;
  }
`;

const ClassItem = ({ classItem }) => {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  // if the user has played the video before, then display its progress bar
  const userClassEntry = userData.classEntries.filter(
    (classEntry) => classEntry.classId === classItem._id
  );
  const progressBar = userClassEntry[0]
    ? `${userClassEntry[0].played * 100}%`
    : 0;

  // route to the class video
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
      <StyledProgressBar progressBar={progressBar} />
    </StyledLink>
  );
};

export default ClassItem;
