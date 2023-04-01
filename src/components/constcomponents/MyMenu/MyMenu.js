import React from "react";
import { Link } from "react-router-dom";
export default function MyMenu() {
  return (
    <div style={{ fontSize: 12 }}>
      <Link to="/hr">Бүрэлдэхүүн</Link>| <Link to="/communicate">Холбоо</Link> |
      Авто техник | Зэвсэг | Инженерийн байгууламж | Хариуцсан хэсгийн
      өгөгдөхүүн | Хилийн манааны тохироо | Амралт ачааллын график, Томилгоо |
      Хил хамгаалалтын хувилбар | Газар орны координат | Хоногийн хүч хэрэгслийн
      тооцоо | <Link to="/config">Админ</Link>
    </div>
  );
}
