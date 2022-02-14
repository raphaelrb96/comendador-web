const style = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 50,
        backgroundColor: '#757272',
    },
    content: {
        backgroundColor: '#ff0000',
        width: 400,
        height: 400,
        display: 'flex',
        flexDirection: 'row',
    },
    preto: {
        backgroundColor: '#000',
        width: 50,
        height: 50,
        flexDirection: 'column',
        display: 'flex',
    },
    branco: {
        backgroundColor: '#fffff0',
        width: 50,
        height: 50,
        flexDirection: 'column',
        display: 'flex',
    },
    row: {
        flexDirection: 'column',
        backgroundColor: '#000fff',
        display: 'flex',
    }
};

const Item = ({black}) => {
    return(
        <div style={black ? style.preto : style.branco}>

        </div>
    );
};

const Lista = ({inversa}) => {

    let listaTabuleiro = [];

    for(let i = 0; i< 8; i++) {
        
        let element;
        
        if(inversa) {
            if(i % 2 === 0) {
                element = <Item black />
            } else {
                element = <Item />
            }
        } else {
            if(i % 2 === 0) {
                element = <Item />
            } else {
                element = <Item black />
            }
        }

        
        
        listaTabuleiro.push(element);

    }

    return (
        <div style={style.row}>
            {listaTabuleiro}
        </div>
    );
}

const Campo = () => {

    let gradeTabuleiro = [];

    for(let j = 0; j < 8; j++) {

        let element;
        
        if(j % 2 === 0) {
            element = <Lista />
        } else {
            element = <Lista inversa />
        }
        
        
        
        gradeTabuleiro.push(element);

    }    

    return (
        <div style={style.container}>
            <div style={style.content}>
                {gradeTabuleiro}
            </div>
        </div>
    )
};

export default Campo;