interface Props {
  children?: React.ReactNode;
}

const SideNav = ({ children }: Props) => {
  return (
    <nav>
      <ul>{children}</ul>
    </nav>
  );
};
export default SideNav;
