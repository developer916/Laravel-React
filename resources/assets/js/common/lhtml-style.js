export default {
  iconList: {
    google: "fa-google",
    outlook: "fa-windows",
    download: "fa-download",
    apple: "fa-apple",
  },
  keyValues: {
    // start - settings
    type: "type",
    // start - type list
    none: 'None',
    google: "Google",
    outlook: "Outlook",
    apple : "Apple Icloud",
    download: "Download as ICS",
    text: "Text",
    link: "ICS File Link",
    // end - type list
    idStr: "id",
    title: "text",
    icon: "icon",
    classStr: "class",
    // end - settings
    // start - style
    margin: "margin",
    marginLeft: "margin-left",
    marginTop: "margin-top",
    marginRight: "margin-right",
    marginBottom: "margin-bottom",
    padding: "padding",
    paddingLeft: "padding-left",
    paddingTop: "padding-top",
    paddingRight: "padding-right",
    paddingBottom: "padding-bottom",
    borderRadius: "border-radius",
    borderTopLeftRadius: "border-top-left-radius",
    borderTopRightRadius: "border-top-right-radius",
    borderBottomLeftRadius: "border-bottom-left-radius",
    borderBottomRightRadius: "border-bottom-right-radius",
    width: "width",
    height: "height",
    backgroundColor: "background-color",
    color: "color",
    borderColor: "border-color",
    fontSize: "font-size",
    // end - style
  },
  iconTypeList: [
    "none",
    "google",
    "outlook",
    "apple",
    "download",
    "text",
    "link"
  ],
  settingsList: [
    'type',
    'title',
    'icon',
    'idStr',
    'classStr'
  ],
  colorKeys: [
    'color',
    'backgroundColor',
    'borderColor'
  ],
  fileKeys: [
    'icon'
  ],
  rowSample: [
    {
      key: "width"
    },
    {
      key: "height"
    },
    {
      key: "backgroundColor"
    },
    {
      key: "color"
    },
    {
      key: "borderColor"
    },
    {
      key: "fontSize"
    },
    {
      key: "margin",
      values: [
        "marginLeft",
        "marginTop",
        "marginRight",
        "marginBottom"
      ]
    },
    {
      key: "padding",
      values: [
        "paddingLeft",
        "paddingTop",
        "paddingRight",
        "paddingBottom"
      ],
    },
    {
      key: "borderRadius",
      values: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
      ]
    }
  ],
  buttonTypes: [
    "none",
    "google",
    "outlook",
    "apple",
    "download"
  ]
}