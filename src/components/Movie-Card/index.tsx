import { Card, Flex, Space, Tag, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { ReactElement } from 'react';
import { useMediaQuery } from 'react-responsive';

interface MovieCardProps {
  //   id: number;
  title: string;
  description: string;
  releaseDate: string;
  posterUrl: string;
  //   rating: number;
  movieGenres: (string | undefined)[];
}

const cardStyle = {
  width: '450px',
  height: '280px',
  borderRadius: 'none',
  boxShadow: '1px 5px 10px rgba(0, 0, 0, 0.15)',
  display: 'flex',
};
const posterStyle = {
  display: 'block',
  height: '280px',
};

function MovieCard({
  //   id,
  title,
  description,
  releaseDate,
  posterUrl,
  //   rating,
  movieGenres,
}: MovieCardProps): ReactElement {
  const isMobile = useMediaQuery({ query: '(max-width: 990px)' });
  const genres = movieGenres.map((genre) => (
    <Tag key={movieGenres.indexOf(genre)} style={{ padding: '0 5px' }}>
      {genre}
    </Tag>
  ));
  const justify = isMobile ? 'flex-start' : 'space-between';
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
              ? { ...posterStyle, height: '90px', boxSizing: 'content-box', padding: '5px 5px 5px 10px' }
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
          <Typography.Title
            level={5}
            style={
              isMobile
                ? { margin: 0, marginTop: '5px', textAlign: 'left' }
                : { margin: '0', marginTop: '10px', textAlign: 'left' }
            }
          >
            {title}
          </Typography.Title>
          <Typography.Text type="secondary">{releaseDate}</Typography.Text>
          <Space size={[0, 8]} wrap>
            {genres}
          </Space>
          {!isMobile && (
            <Paragraph style={{ maxWidth: '230px', textAlign: 'start', fontSize: '12px' }}>{description}</Paragraph>
          )}
        </Flex>
      </Flex>
      {isMobile && (
        <Paragraph style={{ maxWidth: '370px', textAlign: 'start', fontSize: '12px', padding: '0 10px 5px 10px' }}>
          {description}
        </Paragraph>
      )}
    </Card>
  );
}

export default MovieCard;
