/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';
import Flex from './Flex';
import { css } from '@emotion/react';
import Text from './Text';
import Skeleton from './Skeleton';
import Spacing from './Spacing';

interface ListRowProps {
  left?: ReactNode;
  contents?: ReactNode;
  right?: ReactNode;
  onClick?: () => void;
  withArrow?: boolean;
  as?: 'div' | 'li';
}

const ListRow = ({ left, right, contents, onClick, withArrow, as }: ListRowProps) => {
  return (
    <Flex as={as} css={listRowContainerStyles} onClick={onClick} align="center">
      <Flex css={listRowLeftStyles}>{left}</Flex>
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      <Flex css={listRowLeftStyles}>{right}</Flex>
      {withArrow ? <IconArrowRight /> : null}
    </Flex>
  );
};

const listRowContainerStyles = css`
  padding: 12px 24px;
`;

const listRowLeftStyles = css`
  margin-right: 14px;
`;

const listRowContentsStyles = css`
  flex: 1;
`;

function ListRowSkeleton() {
  return (
    <Flex as="li" css={listRowContainerStyles} align="center">
      <Flex css={listRowLeftStyles}></Flex>
      <Flex css={listRowContentsStyles}>
        <ListRow.Texts
          title={
            <>
              <Skeleton width={67} height={23} />
              <Spacing size={2} />
            </>
          }
          subTitle={<Skeleton width={85} height={20} />}
        />
      </Flex>
      <IconArrowRight />
    </Flex>
  );
}

function IconArrowRight() {
  return (
    <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" width={20} height={20}>
      <title />
      <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
    </svg>
  );
}

function ListRowTexts({ title, subTitle }: { title: React.ReactNode; subTitle: React.ReactNode }) {
  return (
    <Flex direction="column">
      <Text bold={true}>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  );
}
ListRow.Texts = ListRowTexts;
ListRow.Skeleton = ListRowSkeleton;
export default ListRow;
