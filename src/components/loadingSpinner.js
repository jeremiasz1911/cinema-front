import { Spinner } from "reactstrap"

const loadingSpinner = (params) => {
    return (
        <div className="d-flex align-items-end">
            <Spinner type="grow" color="primary" className="m-1"/> 
            <h5>Ładowanie, proszę czekać...</h5>
        </div>
    )
}
export default loadingSpinner;