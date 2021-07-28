import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import constants from "../../constants";
import List from "./components/List";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import styles from "./main.module.scss";
import {
  HandleChangeProps,
  UserCredentialProps,
  ListDataProps,
  TypeEnum,
  ActionEnum,
} from "./main.d";

const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_API });
const { lng } = constants;

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userCredentials, setUserCredentials] = useState<UserCredentialProps>(
    {}
  );
  const [listData, setListData] = useState<ListDataProps>({});

  const handleChange = ({ type, action, value }: HandleChangeProps) => {
    const listType = listData[type];
    if (listType && value) {
      handleListUpdate({
        ...listData,
        [type]:
          action === ActionEnum.remove
            ? [...listType].filter((item) => item !== value)
            : [...listType, value],
      });
    }
  };

  const fetchListData = useCallback(() => {
    const { groupId, userId } = userCredentials;
    setLoading(true);
    api
      .get(`/proscons/group/${groupId}/user/${userId}`)
      .then((response) => {
        setListData({
          cons: response.data.cons,
          pros: response.data.pros,
        });
      })
      .catch(() => {
        setListData({
          cons: ["abc cons", "someveryveryverylongtext"],
          pros: ["abc pros", "new item"],
        });
        setErrorMsg(lng.errorMsg);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userCredentials]);

  const handleListUpdate = (newDataList: ListDataProps) => {
    const { groupId, userId } = userCredentials;
    setLoading(true);
    api
      .put(`/proscons/group/${groupId}/user/${userId}`, newDataList)
      .then(() => {
        fetchListData();
      })
      .catch(() => {
        setErrorMsg(lng.errorMsg);
        setLoading(false);
      });
  };

  // get user credentials and set as 'userCredentials' state
  useEffect(() => {
    setLoading(true);
    const requestGroupId = api.get("/group/meri_terenti");
    const requestUserId = api.get("/user/meri_terenti");
    axios
      .all([requestGroupId, requestUserId])
      .then(
        axios.spread((...responses) => {
          const groupId = responses[0].data.groupId;
          const userId = responses[1].data.userId;
          setUserCredentials({ groupId, userId });
        })
      )
      .catch(() => {
        setUserCredentials({
          groupId: "g1621684657929",
          userId: "u1621684657929",
        });
        setErrorMsg(lng.errorMsg);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const { groupId, userId } = userCredentials;
    if (groupId && userId) {
      fetchListData();
    }
  }, [userCredentials, fetchListData]);

  return (
    <div className={styles.main}>
      <h1 className={styles.header}>{lng.header}</h1>
      {loading && <Loading />}
      {!loading && (
        <div className={styles.container}>
          <List
            type={TypeEnum.pros}
            title={lng.pros}
            data={listData.pros}
            handleChange={handleChange}
          />
          <List
            type={TypeEnum.cons}
            title={lng.cons}
            data={listData.cons}
            handleChange={handleChange}
          />
        </div>
      )}
      {!!errorMsg.length && (
        <Modal text={lng.errorMsg} onClose={() => setErrorMsg("")} />
      )}
    </div>
  );
};

export default Main;
