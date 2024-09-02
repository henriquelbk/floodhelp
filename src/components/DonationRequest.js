import { closeRequest, donate } from "@/services/Web3Services";
import { generateAvatarURL } from "@cfx-kit/wallet-avatar";
import Web3 from "web3";
import { formatDistance } from "date-fns";

export default function DonationRequest({ data }) {
  function btnCloseClick() {
    if (!confirm("Are you sure you want to close this request?")) return;

    closeRequest(data.id)
      .then(result => {
        alert("Request closed successfully.");
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
        alert(err.message);
      });
  }

  function btnHelpClick() {
    const donationInBnb = prompt("Please enter your donation (BNB): ", 0);
    donate(data.id, donationInBnb)
      .then(result => {
        alert("Donation accepted.");
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
        alert(err.message);
      });
  }

  return (
    <>
      <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
        <img
          width={32}
          height={32}
          className="rounded-circle"
          src={generateAvatarURL(data.author)}
        />
        <div className="d-flex gap-2 w-100 justify-content-between">
          <div className="w-100">
            <div className="row">
              <div className="col-10">
                <h6 className="mb-0">
                  {data.title} &rsaquo;&rsaquo; Contato: {data.contact}
                </h6>
              </div>
              <div className="col-2">
                <div className="text-end">
                  {localStorage.getItem("wallet") ===
                  data.author.toLowerCase() ? (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={btnCloseClick}
                    >
                      Close
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={btnHelpClick}
                    >
                      &#36; Help
                    </button>
                  )}
                </div>
              </div>
            </div>
            <p className="opacity-75 pe-5 mb-0 me-5">{data.description}</p>
            <div className="row">
              <div className="col">
                <span className="me-1 opacity-75">Goal:</span>
                <span className="opacity-50">
                  {data.balance
                    ? `BNB ${Web3.utils.fromWei(
                        data.balance,
                        "ether"
                      )} obtained from ${Web3.utils.fromWei(
                        data.goal,
                        "ether"
                      )}`
                    : `BNB ${Web3.utils.fromWei(data.goal, "ether")}`}
                </span>
              </div>
              <div className="col text-end">
                <small className="opacity-50 text-nowrap">Created {formatDistance(new Date(Number(data.timestamp) * 1000), new Date(), { addSuffix: true })}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
