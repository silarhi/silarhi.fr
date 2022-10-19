import {ChildrenPropTypes} from "../../props/types"

export default function Title({children}) {
    return (
        <div className={"mb-4"}>
            <h1 className={"display-5 text-center"}>{children}</h1>
        </div>
    )
}

Title.propTypes = {
    children: ChildrenPropTypes.isRequired
}
