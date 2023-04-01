import React, { useContext, useState } from "react";
import CrimeMainContext from "./crimeMainContext";
import myUtil from "../../../util/myUtil";
import { Image } from "antd";
import "./table.css";
export default function PersonList() {
  const ctxcrimemain = useContext(CrimeMainContext);
  const changeRank = (data) => {
    let tovch = "энг";
    switch (data) {
      case "Энгийн":
        tovch = "энг";
        break;
      case "Байлдагч":
        tovch = "б/ч";
        break;
      case "Ахлах байлдагч":
        tovch = "а/б";
        break;
      case "Дэд түрүүч":
        tovch = "д/т";
        break;
      case "Түрүүч":
        tovch = "т/ч";
        break;
      case "Ахлах түрүүч":
        tovch = "а/т";
        break;
      case "Дэд ахлагч":
        tovch = "д/а";
        break;
      case "Ахлагч":
        tovch = "а/ч";
        break;
      case "Ахлах ахлагч":
        tovch = "а/а";
        break;
      case "Дэслэгч":
        tovch = "д/ч";
        break;
      case "Ахлах дэслэгч":
        tovch = "а/д";
        break;
      case "Ахмад":
        tovch = "а/х";
        break;
      case "Хошууч":
        tovch = "х/ч";
        break;
      case "Дэд хурандаа":
        tovch = "д/х";
        break;
      case "Хурандаа":
        tovch = "х/а";
        break;
      case "Бригадын генерал":
        tovch = "бр/ген";
        break;
      case "Хошууч генерал":
        tovch = "хч/ген";
        break;
      case "Дэслэгч генерал":
        tovch = "дч/ген";
        break;
      case "Генерал":
        tovch = "ген";
        break;
      default:
        tovch = "-";
    }
    return tovch;
  };
  const changeSex = (data) => {
    let tovch = "Эр";
    switch (data) {
      case "Эмэгтэй":
        tovch = "эм";
        break;
      default:
        tovch = "Эр";
    }
    return tovch;
  };

  return (
    <div>
      <h5 style={{ color: "red" }}>
        Холбогдогчийн тоо: {ctxcrimemain.state.p_personlist.length}
      </h5>
      <table style={{ width: "100%", fontSize: 12 }}>
        <th style={{ border: "1px solid black" }}>Зураг</th>
        <th colSpan={2}>Байршил</th>

        <th>Албан тушаал</th>
        <th>Цол</th>
        <th>Овог, нэр</th>

        <th>Нас</th>
        <th>Хүйс</th>
        <th>БКД</th>
        <th>Регистер </th>
        <th>Цэрэгт татагдсан анги </th>
        <th>он</th>
        <th>ээлж</th>
        <th>Тангараг өргөсөн</th>
        <th>Боловсрол</th>
        <th></th>
        {ctxcrimemain.state.p_personlist.map((el, index) => (
          <tr key={el.fp_id}>
            <td>
              {el.fp_pht != null ? (
                <Image
                  width={40}
                  src={`${myUtil.apicdnserver}/image/${el.fp_pht}`}
                />
              ) : null}
            </td>
            <td onClick={() => ctxcrimemain.clickedPerson(index)}>
              {el.fp_sqd}
            </td>
            <td onClick={() => ctxcrimemain.clickedPerson(index)}>
              {el.fp_sqd_sub}
            </td>
            <td onClick={() => ctxcrimemain.clickedPerson(index)}>
              {el.fp_pstn?.length > 10 ? el.fp_pstn.substr(0, 10) : el.fp_pstn}
              ...
            </td>
            <td onClick={() => ctxcrimemain.clickedPerson(index)}>
              {changeRank(el.fp_rnk_id)}{" "}
            </td>
            <td onClick={() => ctxcrimemain.clickedPerson(index)}>
              {el.fp_lst_nme} {el.fp_fst_nme}
            </td>

            <td onClick={() => ctxcrimemain.clickedPerson(index)}>
              {el.fp_age} {changeSex(el.fp_sex)}
            </td>
            <td onClick={() => ctxcrimemain.clickedPerson(index)}>
              {el.fp_bkd} {el.fp_bkd_nc}
            </td>
            <td>{el.fp_reg} </td>
            <td onClick={() => ctxcrimemain.clickedPerson(index)}>
              {el.fp_tstsqd}
            </td>
            <td onClick={() => ctxcrimemain.clickedPerson(index)}>
              {el.fp_tstdt}
            </td>
            <td onClick={() => ctxcrimemain.clickedPerson(index)}>
              {el.fp_tsteelj?.substr(0, 1)}
            </td>
            <td onClick={() => ctxcrimemain.clickedPerson(index)}>
              {el.fp_tudt}{" "}
            </td>
            <td onClick={() => ctxcrimemain.clickedPerson(index)}>
              {el.fp_edu_id}{" "}
            </td>
            <td
              style={{ color: "red" }}
              onClick={() => ctxcrimemain.removePerson(index)}
            >
              Хасах
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
