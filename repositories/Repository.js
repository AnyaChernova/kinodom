import Common from "~/repositories/Common";
import Profile from "~/repositories/Profile";
import Locations from "~/repositories/Locations";
import Password from "~/repositories/Password";
import Favorite from "~/repositories/Favorite";
import Support from "~/repositories/Support";
import History from "~/repositories/History";
import Search from "~/repositories/Search";
import Orders from "~/repositories/Orders";
import Transport from "~/repositories/Transport";

export default ($axios) => ({
	common: Common($axios),
	profile: Profile($axios),
	locations: Locations($axios),
	password: Password($axios),
	favorite: Favorite($axios),
	support: Support($axios),
	history: History($axios),
	search: Search($axios),
	orders: Orders($axios),
	transport: Transport($axios),
})
