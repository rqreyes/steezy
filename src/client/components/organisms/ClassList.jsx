import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import Search from '../molecules/Search';
import ClassItem from '../molecules/ClassItem';
import Loading from '../atoms/Loading';

const StyledClassesHeader = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  margin-bottom: 10px;

  /* small devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
    flex-direction: row;
    margin-bottom: 0;
  }
`;

const StyledH2 = styled.h2`
  /* small devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
    margin-right: 40px;
  }
`;

const StyledNotResults = styled.div`
  text-align: center;
  margin-top: 20vh;
`;

const StyledSlider1 = styled.section`
  margin-bottom: 16px;

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

    &:hover,
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
      cursor: pointer;
    }
  }
`;

const StyledArrow = styled.button`
  color: #b4b7b7;
  background: none;
  border: 0;

  &:hover {
    color: #0a78fb;
  }
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

  // search class video
  const searchClassList = async (search) => {
    try {
      const searchRes = await axios.post('/class/search', { search });

      if (searchRes.data.length === 0) {
        setClassList({ ...classList, noResults: true });
      } else {
        // toggle infinite if number of classes is greater than 5 slides (it's buggy otherwise)
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

  // scroll left
  const PrevArrow = ({ onClick }) => (
    <StyledArrow type='button' onClick={onClick}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </StyledArrow>
  );

  // scroll right
  const NextArrow = ({ onClick }) => (
    <StyledArrow type='button' onClick={onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </StyledArrow>
  );

  // configure class video slider settings
  const settings1 = {
    arrows: false,
    infinite: classList.infinite,
    rows: 3,
    slidesPerRow: 3,

    // adjust grid display with breakpoints (in max widths and inclusive)
    responsive: [
      {
        breakpoint: 575,
        settings: {
          rows: 3,
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          rows: 4,
          slidesPerRow: 2,
        },
      },
    ],
  };

  // configure pagination slider settings
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

  // adjust pagination number count based on viewport width
  const calcNav2Count = (rows, slidesPerRow) => {
    const nav2Count = Math.ceil(
      classList.classes.length / (rows * slidesPerRow)
    );
    const result = [];

    for (let i = 1; i <= nav2Count; i += 1) {
      result.push(<Fragment key={i}>{i}</Fragment>);
    }

    return result;
  };

  let nav2CountDisplay;

  // extra small devices (portrait phones, 576px and down)
  const isXSmall = useMediaQuery({
    maxWidth: 575,
  });

  // small devices (landscape phones, 576px and up)
  const isSmall = useMediaQuery({
    minWidth: 576,
    maxWidth: 991,
  });

  if (isXSmall) {
    const mediaQuery = settings1.responsive.find(
      (settings) => settings.breakpoint === 575
    );

    nav2CountDisplay = calcNav2Count(
      mediaQuery.settings.rows,
      mediaQuery.settings.slidesPerRow
    );
  } else if (isSmall) {
    const mediaQuery = settings1.responsive.find(
      (settings) => settings.breakpoint === 991
    );

    nav2CountDisplay = calcNav2Count(
      mediaQuery.settings.rows,
      mediaQuery.settings.slidesPerRow
    );
  } else {
    nav2CountDisplay = calcNav2Count(settings1.rows, settings1.slidesPerRow);
  }

  const classListDisplay =
    classList.noResults === true ? (
      <StyledNotResults>
        <p>No results were found</p>
      </StyledNotResults>
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

  // if no classes are loaded, then display the loading screen
  const isLoading = classList.classes.length === 0;

  // fetch classes
  useEffect(() => {
    (async () => {
      const classListRes = await axios.get('/class');
      setClassList({
        classes: classListRes.data,
        infinite: true,
        noResults: false,
      });
    })();
  }, []);

  // connect class list and pagination sliders together
  useEffect(() => {
    if (slider1.length !== 0 && slider2.length !== 0) {
      setNav1(slider1);
      setNav2(slider2);
    }
  }, [slider1, slider2]);

  return (
    <main>
      <StyledClassesHeader>
        <StyledH2>Classes</StyledH2>
        <Search searchClassList={searchClassList} />
      </StyledClassesHeader>
      {classListDisplay}
      <Loading isLoading={isLoading} />
    </main>
  );
};

export default ClassList;
