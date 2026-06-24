"use client";
import Modal from "@/components/modules/modal/Modal";
import styles from "@/styles/p-user/orders.module.css";
import OrderDetailModal from "./OrderDetailModal";
function OrdersData({ title }) {
  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.Table_Container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>تاریخ</th>
              <th>وضعیت</th>
              <th>کاربر</th>
              <th>مبلغ پرداختی </th>
              <th>استان</th>
              <th>عملیات ها</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1405/4/2</td>
              <td>تکمیل شده</td>
              <td>میلاد سلامیان</td>
              <td>200000 هزار تومان</td>
              <td>البرز</td>
              <td>
                <Modal>
                  <Modal.Open name="order_detail">
                    <button type="button" className={styles.btn}>
                      نمایش
                    </button>
                  </Modal.Open>
                  <Modal.Window name="order_detail">
                    <OrderDetailModal />
                  </Modal.Window>
                </Modal>
              </td>
            </tr>
             <tr>
              <td>2</td>
              <td>1405/4/2</td>
              <td>تکمیل شده</td>
              <td>رضا رضایی</td>
              <td>200000 هزار تومان</td>
              <td>تهران</td>
              <td>
                <Modal>
                  <Modal.Open name="order_detail">
                    <button type="button" className={styles.btn}>
                      نمایش
                    </button>
                  </Modal.Open>
                  <Modal.Window name="order_detail">
                    <OrderDetailModal />
                  </Modal.Window>
                </Modal>
              </td>
            </tr>
             <tr>
              <td>3</td>
              <td>1405/4/2</td>
              <td>تکمیل شده</td>
              <td>محمد اکبری</td>
              <td>200000 هزار تومان</td>
              <td>تهران</td>
              <td>
                <Modal>
                  <Modal.Open name="order_detail">
                    <button type="button" className={styles.btn}>
                      نمایش
                    </button>
                  </Modal.Open>
                  <Modal.Window name="order_detail">
                    <OrderDetailModal />
                  </Modal.Window>
                </Modal>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersData;
