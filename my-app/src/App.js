import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Albums />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/albums/:id" element={<AlbumDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Navigation() {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">React App</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <Link className="nav-link" to="/">
            Albums
          </Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/posts">
            Posts
          </Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((data) => setAlbums(data));
  }, []);

  return (
    <div>
      <h2>Albums</h2>
      <ListGroup>
        {albums.map((album) => (
          <ListGroupItem key={album.id}>
            <Link to={`/albums/${album.id}`}>{album.title}</Link>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

function AlbumDetails() {
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
      .then((response) => response.json())
      .then((data) => setPhotos(data));
  }, [id]);

  return (
    <div>
      <h2>Album Details</h2>
      <ListGroup>
        {photos.map((photo) => (
          <ListGroupItem key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} /> {photo.title}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <ListGroup>
        {posts.map((post) => (
          <ListGroupItem key={post.id}>
            <h5>{post.title}</h5>
            <p>{post.body}</p>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

export default App;
