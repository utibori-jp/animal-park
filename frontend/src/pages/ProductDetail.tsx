import React from 'react';
import {useParams} from 'react-router-dom';

const ProductDetail: React.FC = () => {
    const {id} = useParams<{ id: string }>(); // URL パラメータから ID を取得

    return (
        <div>
            <h1>商品詳細</h1>
            <p>商品 ID: {id}</p>
            {/* 商品情報を API などから取得し、ここに表示 */}
        </div>
    );
};

export default ProductDetail;
