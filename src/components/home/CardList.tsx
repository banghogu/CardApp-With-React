import React, { useCallback } from "react";
import ListRow from "../shared/ListRow";
import { useInfiniteQuery } from "react-query";
import { getCards } from "@/remote/card";
import { flatten } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import Badge from "../shared/Badge";
import { useNavigate } from "react-router-dom";

const CardList = () => {
  const navigate = useNavigate();
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(["cards"], ({ pageParam }) => getCards(pageParam), {
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible;
    },
  });
  if (data == null) {
    return null;
  }

  const loadMore = () => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  };

  const cards = flatten(data?.pages.map(({ items }) => items));

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="130px"
      >
        <ul>
          {cards?.map((card, index) => {
            return (
              <ListRow
                key={card.id}
                contents={
                  <ListRow.Texts
                    title={`${index + 1}위`}
                    subTitle={card.name}
                  />
                }
                right={
                  card.payback != null ? <Badge label={card.payback} /> : null
                }
                withArrow={true}
                onClick={() => {
                  navigate(`/card/${card.id}`);
                }}
              />
            );
          })}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default CardList;
