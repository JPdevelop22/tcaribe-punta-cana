let selects = Object.values(travels.pickups)

function drawStartSelect() {
    $('#startContainer').html(
        '<label for="bookStartPoint">Punto de recojida</label>' + 
        '<select name="puntoDeRecojida" id="bookStartPoint">' + 
            '<option value=""></option>' + 
        '</select>'
    )
    
    selects.forEach(pickUp => {
        $('#bookStartPoint').append(
            `<option value="${pickUp}">${pickUp["name-ES"]}</option>`
        )
    })
}

function drawTracks(tracks) {
    $('#tracksContainer').html(
        '<label for="tracks">vias</label>' + 
        '<select name="tracks" id="tracks">' + 
            '<option value=""></option>' + 
        '</select>'
    )

    for (let i = 1; i <= tracks; i++) {
        $('#tracks').append(
            `<option value="${i}">${i} vias</option>`
        )
    }
}

$('#bookType').on('change', (e) => {
    if (e.target.value === 'viaje turistico') {
        drawStartSelect()
    }
})

$('#bookStartPoint').on('change', (e) => {
    drawTracks(e.target.value.tracks)
})


