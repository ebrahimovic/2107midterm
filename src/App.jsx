import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Form, FormControl, Button } from 'react-bootstrap';
import './App.css';

const Key = 'a1970357721e47f6941c4fc09d42af48';
const URL = `https://newsapi.org/v2/everything?q=apple&sortBy=popularity&apiKey=${Key}`;

// Array of border colors
const borderColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];

function NewsCard({ title, text, imgSrc, url, index }) {
  const borderColor = borderColors[index % borderColors.length]; // Use modulo to cycle through colors
  return (
    <Card border={borderColor}>
      <Card.Img variant="top" src={imgSrc} style={{ width: '100%', height: '200px' }} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Button variant={borderColor} onClick={() => window.open(url, '_blank')}>
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
    <div>
      <div className="myHeader">
        <h1>News</h1>
        <div className='search-bar'>
          <Form>
            <FormControl
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form>
        </div>
      </div>
      <div className="myContainer">
        {filteredNews.length === 0 ? (
          <div className="notFound">
            <p>No results found, please try something else.</p>
          </div>
        ) : (
          <Row xs={1} md={3} className="myCards">
            {filteredNews.map((newsItem, index) => (
              <Col key={index} className="myCard">
                <NewsCard
                  title={newsItem.title}
                  text={newsItem.description}
                  imgSrc={newsItem.urlToImage}
                  url={newsItem.url}
                  index={index} // Pass the index to NewsCard
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

HomePage.propTypes = {};
export default HomePage;
