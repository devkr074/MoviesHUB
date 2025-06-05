import Card from '../component/Card';
const Shows = ({ user }) => {
  const showsList = ["Breaking Bad", "Game of Thrones", "Stranger Things", "The Witcher"];
  return (
    <div>
      <h2>Shows</h2>
      <div className="row">
        {showsList.map((show, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <Card title={show} type="show" user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Shows;