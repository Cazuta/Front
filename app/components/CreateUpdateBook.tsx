import { Input, Modal } from "antd";
import { BookRequest } from "../Services/books";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";

interface Props {
    mode: Mode;
    values: Book;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: BookRequest) => void;
    handleUpdate: (id: string, request: BookRequest) => void;
}

export enum Mode {
    Create,
    Edit,
}

export const CreateUpdateBook = ({
    mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate
}: Props) => {

    const [title, setTitle] = useState<string>("")
    const [description, setDescriptition] = useState<string>("")
    const [price, setPrice] = useState<number>(1)

    useEffect(() => {
        setTitle(values.title)
        setDescriptition(values.description)
        setPrice(values.price)
    }, [values])



    const handleOnOk = async () => {
        const bookRequest = { title, description, price }

        mode == Mode.Create ? handleCreate(bookRequest) : handleUpdate(values.id, bookRequest)

    }



    return (
        <Modal
            title={mode == Mode.Create ? "Добавить книгу" : "Редактировать книгу"}

            onOk={handleOnOk}
            onCancel={handleCancel}
            open={isModalOpen} cancelText="Отмена"
        >
            <div className="book_modal">
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Название книги"
                />
                <TextArea
                    value={description}
                    onChange={(e) => setDescriptition(e.target.value)}
                    autoSize={{ minRows: 3, maxRows: 3 }}
                    placeholder="Описание книги"
                />
                <Input
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Цена книги"
                />

            </div>
        </Modal>
    );
}


