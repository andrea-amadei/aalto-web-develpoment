import { useSelector } from 'react-redux';

export const UsersPage = () => {
  const blogs = useSelector(state => state.blogs);

  const blogsByUser = {};
  blogs.forEach(x => {
    if(!blogsByUser[x.user.name])
      blogsByUser[x.user.name] = 1;
    else
      blogsByUser[x.user.name] += 1;
  })

  return (
    <div>
      <h2>Users</h2>

      <table>
        <tbody>
        {
          Object.entries(blogsByUser).map(x =>
            <tr key={x[0]}>
              <td><b>{x[0]}</b></td>
              <td>{x[1]}</td>
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage;
