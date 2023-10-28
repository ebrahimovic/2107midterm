import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import './App.css';

const Key = 'a1970357721e47f6941c4fc09d42af48';
const URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${Key}`;

function NewsCard({ title, text, imgSrc, url }) {
  return (
    <Card style={{ width: '100%', height: '500px' }} >
      <Card.Img
        variant="top"
        src={imgSrc}
        style={{ width: '100%', height: '200px' }} 
      />
      <Card.Body >
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Button variant="primary" onClick={() => window.open(url, '_blank')}>
          Go to Article
        </Button>
      </Card.Body>
    </Card>
  );
}

function HomePage(props) {
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getNewsData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNewsData(data.articles);
      } catch (error) {
        setError(error.message);
      }
    };
    getNewsData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNews = newsData.filter((newsItem) =>
    newsItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
    <div className="myContainer ">
      <h1> News</h1>
      <div className="search-bar ">
        <Form>
          <FormControl
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form>
      </div>

      <Row xs={1} md={3} className="myCards">
        {filteredNews.map((newsItem, index) => (
          <Col key={index} className='myCard'>
            <NewsCard
              title={newsItem.title}
              text={newsItem.description}
              imgSrc={newsItem.urlToImage}
              url={newsItem.url}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

HomePage.propTypes = {};
export default HomePage;
