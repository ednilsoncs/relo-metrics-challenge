import './styles.css';
import { useGetCategoryQuery } from '../../api/index'
import { useEffect, useRef, useState } from 'react';
import { createCategorySlice } from '../../zustand/createCategorySlice';
import { useGetImageQuery } from '../../api/useGetImagesQuery';
import { createImagesSlice } from '../../zustand/createImageSlice';
import ImageContainerNotation, { ImageContainerNotationRef } from '../../components/image-container-notation/image-container-notation';
import { BoundingBoxes, useMutationAnnotationQuery } from '../../api/useMutationAnnotationQuery';
import { toast } from 'react-toastify';
import SearchBar from '../../components/searchbar/searchbar';
import OptionList, { OptionsListRef } from '../../components/option-list/option-list';
import ImageList from '../../components/image-list/image-list';

function App() {
    const optionsRef = useRef<OptionsListRef>(null)
    const imageContainerNotation = useRef<ImageContainerNotationRef>(null)
    const { data: categoryData, error: errorCategory } = useGetCategoryQuery()
    const { data: imagesData, error: errorImage } = useGetImageQuery()
    const { mutateAsync } = useMutationAnnotationQuery()
    const { category: {
        onSetCategory, searchList, onSearch
    } } = createCategorySlice()
    const {
        images: {
            list,
            onSetImages,
            onMoveToAnalyzedImageList
        } } = createImagesSlice()
    const [selectedCategory, setSelectedCategory] = useState(0)
    const currentImage = list[0]
    const [selectedSquare, setSelectedSquare] = useState<BoundingBoxes>({
        topLeftX: 0,
        topLeftY: 0,
        width: 0,
        height: 0,
    })

    const handleSelectCategory = (id: number) => {
        setSelectedCategory(id)
    }

    const onSearchCategory = (event: string) => {
        onSearch(event)
    }

    useEffect(() => {
        if (imagesData)
            onSetImages(imagesData)
    }, [imagesData])

    useEffect(() => {
        if (categoryData)
            onSetCategory(categoryData)
    }, [categoryData])

    useEffect(() => {
        if (errorCategory) {
            toast.error(`Something went wrong: ${errorCategory.message}`)
        }
    }, [errorCategory])

    useEffect(() => {
        if (errorImage) {
            toast.error(`Something went wrong: ${errorImage.message}`)
        }
    }, [errorImage])

    const onSelectSquare = (e: BoundingBoxes) => {
        setSelectedSquare(e)
    }

    const onConfirm = async () => {
        if (!selectedCategory) {
            toast.error('Please, you need select a category')
            return
        }

        if (!selectedSquare.width || !selectedSquare.height) {
            toast.error('Please, you need select box at the image')
            return
        }
        const annotation = {
            categoryId: selectedCategory,
            boundingBoxes: [{
                ...selectedSquare
            }]
        }

        try {
            await mutateAsync({
                imageId: currentImage.id,
                annotations: [
                    annotation
                ]
            })
        } catch (err) {
            toast.error("opps! something went wrong")
            return
        }
        onMoveToAnalyzedImageList({
            id: currentImage.id,
            url: currentImage.url,
            annotations: []
        })
        imageContainerNotation?.current?.clean()
        optionsRef?.current?.clean()
        toast.success("Annotation confirmed");
    }

    const onDiscard = async () => {
        try {
            await mutateAsync({
                imageId: currentImage.id,
                annotations: [

                ]
            })
        } catch (err) {
            toast.error("opps! something went wrong")
            return
        }

        onMoveToAnalyzedImageList({
            id: currentImage.id,
            url: currentImage.url,
            annotations: []
        })
        imageContainerNotation?.current?.clean()
        optionsRef?.current?.clean()
        toast.success("Annotation discarded");
    }

    return (
        <div className="main-content">
            <h1>Image Analyzer</h1>
            <div className="analyzer-container">
                <ImageContainerNotation ref={imageContainerNotation} onSelectSquare={onSelectSquare} url={list.length ? currentImage.url : ''} />
                <div className="sidebar">
                    <SearchBar onSearch={onSearchCategory} />
                    <OptionList ref={optionsRef} list={searchList} onSelect={(id) => handleSelectCategory(id)} />
                    <div className="buttons">
                        <button onClick={onDiscard}>Discard</button>
                        <button onClick={onConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
            <div className="image-queue">
                <h2>Next images in queue:</h2>
                <ImageList list={list} />
            </div>
        </div>
    );
}

export default App;
