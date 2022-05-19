import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-dbc2e-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("cannot fetch");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Fetching cart data failed",
        })
      );
    }
  };
};

export const sendCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending...",
        message: "sending cart data",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-dbc2e-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cartData.items,
            totalQuantity: cartData.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "sent data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error sending",
          message: "sending cart data failed",
        })
      );
    }
  };
};
