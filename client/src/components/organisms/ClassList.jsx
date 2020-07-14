import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ClassItem from '../molecules/ClassItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledSlider1 = styled.section`
  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-slide {
    > div {
      display: flex;
      justify-content: center;
    }
  }
`;

const StyledSlider2 = styled.section`
  .slick-slider {
    display: flex;
    justify-content: center;
    margin: auto;
    width: 220px;
  }

  .slick-slide {
    display: flex;
    justify-content: center;

    &.slick-current {
      > div {
        color: #0a78fb;
        border-color: #0a78fb;
      }
    }

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      font-size: 12px;
      font-weight: 700;
      color: #b4b7b7;
      border: 2px solid #b4b7b7;
      border-radius: 6px;
    }
  }
`;

const StyledPrev = styled.button`
  color: #b4b7b7;
  background: none;
  border: 0;
  margin: 0 6px 0 0;
`;

const StyledNext = styled(StyledPrev)`
  margin: 0 0 0 6px;
`;

const ClassList = () => {
  const [classList, setClassList] = useState([]);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  let slider1 = [];
  let slider2 = [];

  const PrevArrow = ({ onClick }) => (
    <StyledPrev type='button' onClick={onClick}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </StyledPrev>
  );

  const NextArrow = ({ onClick }) => (
    <StyledNext type='button' onClick={onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </StyledNext>
  );

  // configure slider settings
  const settings1 = {
    arrows: false,
    rows: 3,
    slidesPerRow: 3,
  };
  const settings2 = {
    arrows: true,
    centerMode: true,
    centerPadding: '0',
    focusOnSelect: true,
    slidesToShow: 5,
    swipeToSlide: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  // calculate number count
  const nav2Count = Math.ceil(
    classList.length / (settings1.rows * settings1.slidesPerRow)
  );
  const nav2CountDisplay = [];
  for (let i = 1; i <= nav2Count; i += 1) {
    nav2CountDisplay.push(<Fragment>{i}</Fragment>);
  }

  const classListDisplay =
    classList.length === 0 ? (
      <p>loading</p>
    ) : (
      <Fragment>
        <section>
          <h2>Classes</h2>
        </section>
        <StyledSlider1>
          <Slider
            asNavFor={nav2}
            ref={(slider) => {
              slider1 = slider;
            }}
            {...settings1}
          >
            {classList.map((classItem) => (
              <ClassItem key={classItem._id} classItem={classItem} />
            ))}
          </Slider>
        </StyledSlider1>
        <StyledSlider2>
          <Slider
            asNavFor={nav1}
            ref={(slider) => {
              slider2 = slider;
            }}
            {...settings2}
          >
            {nav2CountDisplay}
          </Slider>
        </StyledSlider2>
      </Fragment>
    );

  useEffect(() => {
    // fetch classes
    (async () => {
      const classListRes = await axios.get('/class');
      setClassList(classListRes.data);
    })();
  }, []);

  useEffect(() => {
    // initialize sliders
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  return <main>{classListDisplay}</main>;
};

export default ClassList;
