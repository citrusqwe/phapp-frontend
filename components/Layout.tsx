import Nav from './Nav';

const Layout = ({ children, user, tags, currentTag }: any) => {
  return (
    <div className="px-4 py-2">
      <Nav user={user} tags={tags} currentTag={currentTag} />
      {children}
    </div>
  );
};
export default Layout;
