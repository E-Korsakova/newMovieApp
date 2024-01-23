import { StarFilled } from '@ant-design/icons';
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
  rating: number;
  movieGenres: (string | undefined)[];
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

const ratingStyle: React.CSSProperties = {
  width: '30px',
  height: '30px',
  boxSizing: 'content-box',
  border: '2px solid #E9D100',
  borderRadius: '50%',
};

const starsSryle: React.CSSProperties = {
  gap: '5px',
  position: 'absolute',
  bottom: '20px',
  right: '20px',
};

function MovieCard({
  //   id,
  title,
  description,
  releaseDate,
  posterUrl,
  rating,
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
              ? { ...posterStyle, width: '60px', height: '90px', boxSizing: 'content-box', padding: '5px 5px 5px 10px' }
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
                  ? { width: '70%', margin: 0, textAlign: 'left' }
                  : { maxWidth: '80%', margin: 0, textAlign: 'left' }
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
      <Flex style={isMobile ? { ...starsSryle, right: '15px' } : starsSryle}>
        {Array(10)
          .fill('star')
          .map((star, index) => {
            const id = `${star}-${index}`;
            return <StarFilled key={id} style={{ fontSize: '18px', color: '#D9D9D9' }} />;
          })}
      </Flex>
    </Card>
  );
}

export default MovieCard;
