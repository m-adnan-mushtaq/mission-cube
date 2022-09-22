import React from 'react'
import CategoryOption from './Dashboard/CategoryOption'
const CreateMissionFields = ({content,category,data,contentVal,categoryVal}) => {
    return (
        <>
            <div className="form-floating my-2">
                <textarea ref={content} defaultValue={contentVal} className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ "minHeight": "5rem" }}></textarea>
                <label htmlFor="floatingTextarea2">Mission</label>
            </div>
            <div className="form-floating">
                <select ref={category} defaultValue={categoryVal} className="form-select" id="floatingSelect" aria-label="Floating label select example">
                    <option value='' disabled >-- categoreis list--</option>
                    {data.map(category => (
                        <CategoryOption key={category.id} value={category.name} />
                    ))}
                </select>
                <label htmlFor="floatingSelect">Choose Category</label>
            </div>
        </>

    )
}

export default CreateMissionFields