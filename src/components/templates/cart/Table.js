"use client";
import Link from "next/link";
import styles from "./table.module.css";
import totalStyles from "./totals.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import stateData from "@/utils/stateData";
import Select from "react-select";
import Image from "next/image";
import { useCardContext } from "@/context/CardContext";
import { showSwal } from "@/utils/helper";
import { CiShoppingBasket } from "react-icons/ci";
import { useRouter } from "next/navigation";

const stateOptions = stateData();

const Table = () => {
  const router = useRouter();
  const { state, dispatch } = useCardContext();
  const [discount, setDiscount] = useState("");
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);
  const [copenPrice, setCopenPrice] = useState(0);

  useEffect(() => {
    dispatch({ type: "LOAD" });
    let copenPrice = document.cookie.split("=")[1] || 0;
    setCopenPrice(copenPrice);
  }, []);

  const sendDiscountCode = async () => {
    if (!discount) return true;
    const res = await fetch(`/api/discount`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: discount }),
    });

    if (res.status === 200) {
      showSwal(
        "کد تخفیف با موفقیت اعمال شد",
        "success",
        "خیلی هم عالی",
        async () => {
          const {
            discount: { percent },
          } = await res.json();
          const totalPrice = (state.totalPrice * percent) / 100;
          dispatch({ type: "DISCOUNT", price: totalPrice });
          setCopenPrice(totalPrice);
          setDiscount("");
        }
      );
    } else if (res.status === 410) {
      showSwal("کد تخفیف منقضی شده است", "error", "تلاش مجدد", () => {
        setDiscount("");
        dispatch({ type: "DISCOUNT", price: 0 });
      });
    } else if (res.status === 404) {
      showSwal("کد تخفیف یافت نشد", "error", "تلاش مجدد", () => {
        setDiscount("");
        dispatch({ type: "DISCOUNT", price: 0 });
      });
    }
  };

  const deleteDiscountHandler = () => {
    document.cookie = "discount=0; path=/; max-age=0";
    setCopenPrice(0);
  };

  return (
    <>
      {state.basket.length > 0 ? (
        <div className={styles.tabel_container}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th> جمع جزء</th>
                <th>تعداد</th>
                <th>قیمت</th>
                <th>محصول</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state.basket.map((item) => (
                <tr key={item._id}>
                  <td>{(item.count * item.price).toLocaleString()} تومان</td>
                  <td className={styles.counter}>
                    <div>
                      <span
                        onClick={() => {
                          if (copenPrice === 0) {
                            dispatch({
                              type: "DECREASE",
                              payload: { id: item.id },
                            });
                          } else {
                            showSwal(
                              "کوپن اعمال شده است",
                              "warning",
                              "تلاش مجدد",
                              () => {}
                            );
                          }
                        }}
                      >
                        -
                      </span>
                      <p>{item.count}</p>
                      <span
                        onClick={() => {
                          if (copenPrice === 0) {
                            dispatch({
                              type: "INCREASE",
                              payload: { id: item.id },
                            });
                          } else {
                            showSwal(
                              "کوپن اعمال شده است",
                              "warning",
                              "تلاش مجدد",
                              () => {}
                            );
                          }
                        }}
                      >
                        +
                      </span>
                    </div>
                  </td>
                  <td className={styles.price}>
                    {item.price.toLocaleString()} تومان
                  </td>
                  <td className={styles.product}>
                    <Image alt="" src={item.image} width={100} height={100} />
                    <Link href={"/"}>{item.title}</Link>
                  </td>

                  <td>
                    <IoMdClose
                      className={styles.delete_icon}
                      onClick={() => {
                        dispatch({ type: "REMOVE", payload: { id: item.id } });
                        deleteDiscountHandler();
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <section>
            {copenPrice ? (
              <button
                className={styles.update_btn}
                onClick={deleteDiscountHandler}
              >
                حذف کد تخفیف
              </button>
            ) : (
              <button className={styles.update_btn}>بروزرسانی سبد</button>
            )}
            <div>
              {!copenPrice ? (
                <>
                  <button
                    className={styles.set_off_btn}
                    onClick={sendDiscountCode}
                  >
                    اعمال کوپن
                  </button>
                  <input
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value.trim())}
                    type="text"
                    placeholder="کد تخفیف"
                  />
                </>
              ) : (
                <button className={styles.copen_btn} onClick={sendDiscountCode}>
                  کوپن با موفقیت اعمال شد
                </button>
              )}
            </div>
          </section>
        </div>
      ) : (
        <div className={styles.empty_container}>
          <CiShoppingBasket className={styles.empty_icon} />
          <h3>سبد خرید شما خالی است</h3>
          <button
            onClick={() => {
              router.replace("/");
            }}
          >
            بازگشت به فروشگاه
          </button>
        </div>
      )}
      <div className={totalStyles.totals}>
        <p className={totalStyles.totals_title}>جمع کل سبد خرید</p>

        <div className={totalStyles.subtotal}>
          <p>جمع کل </p>
          <p>{state.totalPrice.toLocaleString("fa")} تومان</p>
        </div>

        <div className={totalStyles.subtotal}>
          <p>سود شما </p>
          <p>{Number(copenPrice).toLocaleString("fa-IR")} تومان</p>
        </div>

        <p className={totalStyles.motor}>
          {" "}
          پیک ارسال کننده:{" "}
          <strong>
            {" "}
            {stateSelectedOption?.price.toLocaleString("fa") ??
              "شهر خود را انتخاب کنید"}{" "}
          </strong>
        </p>
        <div className={totalStyles.address}>
          <p>حمل و نقل </p>
          <span>حمل و نقل به {stateSelectedOption?.label}</span>
        </div>
        <p
          onClick={() => setChangeAddress((prev) => !prev)}
          className={totalStyles.change_address}
        >
          تغییر آدرس
        </p>
        {changeAddress && (
          <div className={totalStyles.address_details}>
            <Select
              defaultValue={stateSelectedOption}
              onChange={setStateSelectedOption}
              isClearable={true}
              placeholder={"استان"}
              isRtl={true}
              isSearchable={true}
              options={stateOptions}
            />
            <select className={styles.city_select}>
              <option>شهر خود را انتخاب کنید</option>
              {stateSelectedOption?.value.map((city) => (
                <option value={city} key={crypto.randomUUID()}>
                  {city}
                </option>
              ))}
            </select>
            <input type="number" placeholder="کد پستی" />
            <button onClick={() => setChangeAddress(false)}>بروزرسانی</button>
          </div>
        )}

        <div className={totalStyles.total}>
          <p>مجموع</p>
          <p>
            {(state.totalPrice - Number(copenPrice)).toLocaleString("fa")}
            تومان
          </p>
        </div>
        <Link href={"/checkout"}>
          <button className={totalStyles.checkout_btn}>
            ادامه جهت تصویه حساب
          </button>
        </Link>
      </div>
    </>
  );
};

export default Table;
