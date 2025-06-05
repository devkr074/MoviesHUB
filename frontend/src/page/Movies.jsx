import Card from '../component/Card';
function Movies({ user }) {
  const movies = ["Movie 1", "Movie 2", "Movie 3", "Movie 4"];
  return (
    <div className="row">
      {movies.map((movie, index) => (
        <div className="col-md-4 mb-4" key={index}>
          <Card title={movie} type="movie" user={user} />
        </div>
      ))}
    </div>
  );
};
export default Movies;