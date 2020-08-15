import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";

const CharacterDetail = (props) => {
  const [data, setData] = useState({ name: "[...loading]" });
  useEffect(() => {
    axios
      .get(props.call.replace("http:", "https:"))
      .then((r) => {
        if (r.data.name && r.data.name.length > 0) {
          setData({ name: r.data.name });
        } else if (r.data.title && r.data.title.length > 0) {
          setData({ name: r.data.title });
        } else {
          setData({ name: "unknown" });
        }
      })
      .catch((e) => console.log(e));
  }, [props.call]);

  return <Fragment>{data.name}</Fragment>;
};

export default CharacterDetail;
