if ( $("#body").children().hasClass("admin") ) {

	if (Cookies.get("adminSidebarSize") != null) {
		ass = Cookies.get("adminSidebarSize");
		$(".admin > .menu").css("width", ass);
		$(".admin > .main").css("width", "calc(100% - "+ass+"px)" );
	}

}
