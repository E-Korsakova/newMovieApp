import { StarFilled } from '@ant-design/icons';
import { Card, Flex, Rate, Space, Tag, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { ReactElement, useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import GenresContext from '../../data/GenresContext.ts';
import useMovieDBStore from '../../data/services/useMovieBDStore.ts';

interface MovieCardProps {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  posterUrl: string;
  rating: number;
  userRating: number;
  movieGenres: number[];
}

const cardStyle: React.CSSProperties = {
  width: '450px',
  height: '280px',
  borderRadius: 'none',
  boxShadow: '1px 5px 10px rgba(0, 0, 0, 0.15)',
  display: 'flex',
};
const posterStyle: React.CSSProperties = {
  display: 'block',
  width: '180px',
  height: '280px',
  backgroundSize: 'cover',
};

function MovieCard({
  id,
  title,
  description,
  releaseDate,
  posterUrl,
  rating,
  userRating,
  movieGenres,
}: MovieCardProps): ReactElement {
  const isMobile = useMediaQuery({ query: '(max-width: 990px)' });
  const [addRating] = useMovieDBStore((state) => [state.addRating]);
  const [userRate, setUserRate] = useState(userRating);
  const allGenres = useContext(GenresContext);

  const genres = movieGenres.map((genreId) => (
    <Tag key={genreId} style={{ padding: '0 5px' }}>
      {allGenres.get(genreId)}
    </Tag>
  ));
  const justify = isMobile ? 'flex-start' : 'space-between';
  let voteColor = '';
  if (rating <= 3) voteColor = '#E90000';
  if (rating > 3 && rating <= 5) voteColor = '#E97E00';
  if (rating > 5 && rating <= 7) voteColor = '#E9D100';
  if (rating > 7) voteColor = '#66E900';
  const ratingStyle: React.CSSProperties = {
    width: '30px',
    height: '30px',
    boxSizing: 'content-box',
    border: `2px solid ${voteColor}`,
    borderRadius: '50%',
  };
  return (
    <Card
      hoverable
      style={isMobile ? { ...cardStyle, maxWidth: '380px', maxHeight: '245px' } : cardStyle}
      bodyStyle={{ padding: 0, overflow: 'hidden' }}
    >
      <Flex justify={justify}>
        <img
          style={
            isMobile
              ? {
                  ...posterStyle,
                  width: '60px',
                  height: '90px',
                  boxSizing: 'content-box',
                  padding: '5px 5px 5px 10px',
                  alignSelf: 'center',
                }
              : posterStyle
          }
          alt="Movie poster"
          src={posterUrl}
        />
        <Flex
          vertical
          align="flex-start"
          style={isMobile ? { padding: '0 10px', gap: '5px' } : { padding: '0 20px', gap: '5px' }}
        >
          <Flex
            justify="space-between"
            align="flex-start"
            style={
              isMobile
                ? { width: '295px', marginTop: '5px', paddingRight: '10px' }
                : { width: '240px', marginTop: '10px', paddingRight: '10px' }
            }
          >
            <Typography.Title
              level={5}
              style={
                isMobile
                  ? { width: '90%', margin: 0, textAlign: 'left' }
                  : { maxWidth: '85%', margin: 0, textAlign: 'left' }
              }
            >
              {title}
            </Typography.Title>

            <div style={ratingStyle}>
              <Typography.Text strong style={{ fontSize: '12px', verticalAlign: 'sub' }}>
                {rating}
              </Typography.Text>
            </div>
          </Flex>
          <Typography.Text type="secondary">{releaseDate}</Typography.Text>
          <Space size={[0, 8]} wrap>
            {genres}
          </Space>
          {!isMobile && (
            <Paragraph
              style={{ maxWidth: '230px', height: '80%', textAlign: 'start', fontSize: '12px', marginBottom: 0 }}
            >
              {description}
            </Paragraph>
          )}
        </Flex>
      </Flex>
      {isMobile && (
        <Paragraph
          style={{
            maxWidth: '370px',
            textAlign: 'start',
            fontSize: '12px',
            padding: '0 10px 5px 10px',
            marginBottom: 0,
          }}
        >
          {description}
        </Paragraph>
      )}
      <Rate
        allowHalf
        allowClear
        count={10}
        value={userRate}
        style={{ position: 'absolute', right: '17px', bottom: '15px' }}
        character={<StarFilled style={{ width: '16px' }} />}
        onChange={(value) => {
          setUserRate(value);
          addRating(id, value);
        }}
      />
    </Card>
  );
}

export default MovieCard;
