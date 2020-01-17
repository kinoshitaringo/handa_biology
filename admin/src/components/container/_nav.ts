interface NavProps {
  name: string;
  icon?: string;
  item?: Array<NavProps>;
  to?: string;
}

const ICON_DEFAULT: string = "cil-star";

const TITLE = (title: string, props?: NavProps) => ({
  _name: "CSidebarNavTitle",
  _children: [title],
  ...props
});

const ITEM = (props: NavProps) => ({
  _name: "CSidebarNavItem",
  icon: ICON_DEFAULT, // 默认图标
  ...props
});

const DROP = (props: NavProps, items: Array<NavProps> = []) => ({
  _name: "CSidebarNavDropdown",
  icon: ICON_DEFAULT,
  ...props,
  items: [...items]
});

const DROP_ITEM = (props: NavProps) => ({
  icon: ICON_DEFAULT,
  ...props
});

const NAVS = [
  {
    _name: "CSidebarNav",
    _children: [
      ITEM({
        name: "系统总览",
        icon: "cil-speedometer",
        to: "/sysinfo"
      }),
      TITLE("内容管理"),
      DROP(
        {
          name: "产品信息管理",
          icon: "cil-file"
        },
        [
          DROP_ITEM({
            name: "产品信息列表",
            icon: "cil-list",
            to: "/prods"
          }),
          DROP_ITEM({
            name: "新增产品信息",
            icon: "cil-plus",
            to: "/pord-add"
          })
        ]
      ),
      DROP({ name: "用户管理", icon: "cil-user" }, [
        DROP_ITEM({ name: "用户列表", icon: "cil-list", to: "/users" }),
        DROP_ITEM({ name: "添加用户", icon: "cil-plus", to: "/user-add" })
      ]),
      TITLE("系统设置"),
      DROP({ name: "帐号设置", icon: "cil-user" }, [
        DROP_ITEM({
          name: "基本信息",
          icon: "cil-file",
          to: "/account-info"
        }),
        DROP_ITEM({
          name: "修改密码",
          icon: "cil-lock-locked",
          to: "/account-info"
        })
      ]),
      ITEM({ name: "系统日志", icon: "cil-bug" })
    ]
  }
];

export default NAVS;
