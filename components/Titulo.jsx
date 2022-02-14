

const styles = {
    titulo: {
        color: '#ff0000'
    },
    sub: {
        color: '#000fff'
    },
    container: {
        marginLeft: 20,
        
    }
};
const Titulo = ({title, sub}) => {
    return (
        <div style={styles.container}>
            <h1 style={styles.titulo}>{title}</h1>
            <h2 style={styles.sub}>{sub}</h2>
        </div>
    )
}

export default Titulo;