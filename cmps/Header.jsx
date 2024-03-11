const { useNavigate } = ReactRouter
const { NavLink } = ReactRouterDOM

export function Header() {

	// function onSetPage(ev, page) {
	// 	ev.preventDefault()
	// 	setPage(page)
	// }
	const navigate = useNavigate()

	function onGoHome() {
		navigate('/')
	}

	return <header className="app-header full">
		<h1 className="main-header" onClick={onGoHome}>Miss Book</h1>

		<nav className="app-nav-header flex justify-center">
			<NavLink to="/">Home</NavLink> |
			<NavLink to="/about">About</NavLink> |
			<NavLink to="/book">Books</NavLink>
		</nav>
	</header>
}

