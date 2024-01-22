import { Card, Flex, Space, Tag, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { ReactElement } from 'react';

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
  const genres = movieGenres.map((genre) => (
    <Tag key={movieGenres.indexOf(genre)} style={{ padding: '0 5px' }}>
      {genre}
    </Tag>
  ));
  return (
    <Card hoverable style={cardStyle} bodyStyle={{ padding: 0, overflow: 'hidden' }}>
      <Flex justify="space-between">
        <img style={posterStyle} alt="Movie poster" src={posterUrl} />
        <Flex vertical align="flex-start" style={{ padding: '0 20px', gap: '5px' }}>
          <Typography.Title level={5} style={{ margin: '0', marginTop: '10px', textAlign: 'left' }}>
            {title}
          </Typography.Title>
          <Typography.Text type="secondary">{releaseDate}</Typography.Text>
          <Space size={[0, 8]} wrap>
            {genres}
          </Space>
          <Paragraph style={{ maxWidth: '230px', textAlign: 'start', fontSize: '12px' }}>{description}</Paragraph>
        </Flex>
      </Flex>
    </Card>
  );
}

export default MovieCard;
