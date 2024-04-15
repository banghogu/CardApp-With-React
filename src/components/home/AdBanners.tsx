/** @jsxImportSource @emotion/react */
import React from "react";
import Flex from "../shared/Flex";
import Text from "../shared/Text";
import { css } from "@emotion/react";
import { colors } from "@/styles/colorPalette";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getAdBanners } from "@/remote/addBanner";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const AdBanners = () => {
  const { data, isLoading } = useQuery(["adBanners"], () => getAdBanners());

  return (
    <Containner>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link}>
                <Flex direction="column" css={bannerConStyles}>
                  <Text bold={true}>{banner.title}</Text>
                  <Text typography="t7">{banner.description}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Containner>
  );
};

const bannerConStyles = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`;

const Containner = styled.div`
  padding: 24px;
`;

export default AdBanners;
