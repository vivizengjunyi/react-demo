import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { searchUnsplash } from '../../fetch/unsplash';
export default function Gallery() {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.gallery.photos);
    const keyword = useSelector(state => state.gallery.keyword);
    const keywordChanged = (e) => {
        dispatch({
            type: 'gallery/keywordChanged',
            payload: e.target.value
        })
    }
    useEffect(() => {
        const mb = document.querySelectorAll('.materialboxed');
        window.M.Materialbox.init(mb, {})
    }, [photos])
    return <div className="container">
        <div className="row">
            <div className="input-field col s6">
                <input id="galleryKeyword" type="text" className="validate" value={keyword} onChange={keywordChanged} />
                <label for="galleryKeyword">Search</label>
            </div>
            <div className="input-field col s6">
                <button class="waves-effect waves-light btn" onClick={e => dispatch(searchUnsplash(keyword))}>Search</button>
            </div>
        </div>
        <div className="row">
            {
                photos.map(photo => <div className="col s3 m3" key={photo.id}>
                    <img src={photo.urls.regular} alt={photo.alt_description} className="materialboxed responsive-img" />
                </div>)
            }
        </div>
    </div>
}