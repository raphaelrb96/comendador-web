const styles = {
    text: {
        color: '#000',
        fontWeight: 'bold'
    },
    container: {
        marginLeft: 20,
        
    }
};

const Botao = ({text, click}) => {
    return (
        <span style={styles.container}>
            <button onClick={click}>
                <h3 style={styles.text}>
                    {text}
                </h3>
                
            </button>
        </span>
    )
}

export default Botao