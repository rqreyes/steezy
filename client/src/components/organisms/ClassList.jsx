import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Search from '../molecules/Search';
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
  }

  .slick-list {
    width: 170px;
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

const StyledArrow = styled.button`
  color: #b4b7b7;
  background: none;
  border: 0;
`;

const ClassList = () => {
  const [classList, setClassList] = useState({
    classes: [],
    infinite: false,
    noResults: false,
  });
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  let slider1 = [];
  let slider2 = [];

  // search class
  const searchClassList = async (search) => {
    try {
      const searchRes = await axios.post('/class/search', { search });

      if (searchRes.data.length === 0) {
        setClassList({ ...classList, noResults: true });
      } else {
        // toggle infinite if number of classes is greater than 5 slides (45 classes)
        setClassList({
          classes: searchRes.data,
          infinite:
            searchRes.data >
            settings1.rows * settings1.slidesPerRow * settings2.slidesToShow,
          noResults: false,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const PrevArrow = ({ onClick }) => (
    <StyledArrow type='button' onClick={onClick}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </StyledArrow>
  );

  const NextArrow = ({ onClick }) => (
    <StyledArrow type='button' onClick={onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </StyledArrow>
  );

  // configure slider settings
  const settings1 = {
    arrows: false,
    infinite: classList.infinite,
    rows: 3,
    slidesPerRow: 3,
  };
  const settings2 = {
    arrows: true,
    centerMode: true,
    centerPadding: '0',
    focusOnSelect: true,
    infinite: classList.infinite,
    slidesToShow: 5,
    swipeToSlide: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  // calculate number count
  const nav2Count = Math.ceil(
    classList.classes.length / (settings1.rows * settings1.slidesPerRow)
  );
  const nav2CountDisplay = [];
  for (let i = 1; i <= nav2Count; i += 1) {
    nav2CountDisplay.push(<Fragment key={i}>{i}</Fragment>);
  }

  const classListDisplay =
    classList.noResults === true ? (
      <div>No results were found</div>
    ) : classList.classes.length === 0 ? (
      <p>loading</p>
    ) : (
      <Fragment>
        <StyledSlider1>
          <Slider
            asNavFor={nav2}
            ref={(slider) => {
              slider1 = slider;
            }}
            {...settings1}
          >
            {classList.classes.map((classItem) => (
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
      setClassList({
        classes: classListRes.data,
        infinite: true,
        noResults: false,
      });
    })();
  }, []);

  useEffect(() => {
    // initialize sliders
    if (slider1.length !== 0 && slider2.length !== 0) {
      setNav1(slider1);
      setNav2(slider2);
    }
  }, [slider1, slider2]);

  return (
    <main>
      <section>
        <h2>Classes</h2>
        <Search searchClassList={searchClassList} />
      </section>
      {classListDisplay}
    </main>
  );
};

export default ClassList;
