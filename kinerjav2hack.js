//$('body').append('<script src="https://cdn.jsdelivr.net/gh/syuaibsyuaib/sitpp-2024@v1.0.4b/kinerjav2hack.js"></script>')

/*

let isi = {}
$("#id_opmt_kinerja_utama_detail option").each(function(e,h){
  isi[$(h).text()] = $(h).val()
})

console.log(isi)

backup:
    var tampung = []
    for(let i = 1; i < $('#table td').length;i += 11){
        tampung.push($('#table td').eq(i).text())
    }
    console.log(tampung)
==========================================================================
#### AMBIL ID KEGIATAN ####
    var arr = [], idnya
    $('#table tbody a:odd').each(function(e, h){
        idnya = $(h).attr('onclick').match(/\(\d+/)[0]
        arr.push(idnya.substring(1,idnya.length))
    })
    console.log(arr)
//==========================================================================
//### HAPUS AKTIVITAS ###

    arr.forEach((item)=>{
        hapus_aktifitas_30(item)    
    })
========================================================================
### VERIFIKASI ###
    $('.cek').each(function(i, e){
          if(!$(e).prop('checked')){
            $(e).click()
          }    
        })
    BootstrapDialog.closeAll()
=======================================================================
### UBAH JSON JADI TABLE ###
    https://jsongrid.com/json-grid
*/


var modalLoading = `<div class="modal" id="loadingModal" tabindex="-1" role="dialog" aria-labelledby="loadingModalLabel" data-backdrop="static">
  <div class="modal-dialog" style="height: 95%;" role="document">
  <div class="modal-content" style="top:30%;width: fit-content;border: none;box-shadow: none;background-color: transparent;margin: auto;">
    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif">
  </div>
</div>
</div>`

var modalCustom = function (isi, judul) {
  return `<div class="modal fade" tabindex="-1" role="dialog" id="modalCustom">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">${judul}</h4>
      </div>
      <div class="modal-body">
        ${isi}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>`}

$('body').prepend(modalLoading)

$('#loadingModal').modal('show')

let nip = ($('.info p').text()).match(/\d+/)[0]
let gs = 'https://script.google.com/macros/s/AKfycbzM8w_y9iXCHjSsh8pbjTXMy3fH-yDNDf0RrxmJzuAQJdQ2w3uiNNYmHWn0Xf3BgHv0/exec'
let nipStafSekolah = '', klasifikasi = ''
let isi2 = {}, isi3 = {}
let proto = location.protocol == 'http:' ? 'http:' : 'https:'

// let simpanKlasifikasi = new Promise((resolve, rejecet) => {
//https://sitpp.pareparekota.go.id/c_aktifitas/aksi_tambah_skp_30
console.log(proto)
fetch(`${proto}//sitpp.pareparekota.go.id/c_aktifitas/tambah_skp_30`)
  .then(res => {
    return res.text()
  })
  .then(resp => {
    $(resp).find('#id_opmt_kinerja_utama_detail option').each(function (e, h) {
      isi2[$(h).text()] = $(h).val()
    })
  })
  .then(respp => {
    for (let i = 1; i < Object.keys(isi2).length; i++) {
      isi3[(Object.keys(isi2)[i]).trim()] = isi2[Object.keys(isi2)[i]]
    }
  })
  .then(resppp => {
    isi3["nip"] = nip
    console.log(isi3, 'isi3')
    fetch(gs, {
      method: 'POST',
      body: JSON.stringify(isi3)
    })
      .then(res => {
        return res.json()
      })
      .then(resp => {
        console.log(resp)
        if (resp.pesan != "sheet sudah ada") {
          nipStafSekolah = resp[0]
          klasifikasi = resp[1]
        }

        $('nav').append('<button type="button" class="btn btn-danger navbar-custom-menu" style="margin-top:7px" onclick="tambahbaru()">IMPORT</button>')
        // <button class="navbar-custom-menu" style="background-color:red;color:white;padding:17px 30px;border:none;margin-right:5px" onclick="kinerjahack()">INJECT</button><button class="navbar-custom-menu" style="background-color:red;color:white;padding:17px 30px;border:none;margin-right:5px" onclick="duplikat()">DUPLIKAT</button>

        $('#bln_skp').change(function () {
          cari_skp()
        })

        $('#tengah table:eq(0) td').eq(4).remove()
        $('#loadingModal').modal('hide')
        // resolve(resp)
      }).catch(err => {
        console.log(err)
        alert(err)
        $('#loadingModal').modal('hide')
      })
  }).catch(err => {
    console.log(err)
    alert(err)
    $('#loadingModal').modal('hide')
  })


//ubah nama bulan 3 huruf menjadi angka dengan format yyyy-mm-dd
function ubahBulan(parm) {
  switch (parm) {
    case 'Jan':
      return '01'
      break;
    case 'Feb':
      return '02'
      break;
    case 'Mar':
      return '03'
      break;
    case 'Apr':
      return '04'
      break;
    case 'May':
      return '05'
      break;
    case 'Jun':
      return '06'
      break;
  }
}

function kinerjahack(mode) {
  var ok = confirm("Yakin jeki?")
  if (!ok) {
    return
  }

  //posisi tabel td
  var aktifitas = 2 //aktifitas SKP
  var skp = 3 //SKP tahunan
  var tgl = 1 //tanggal
  var kuantitas = 4 //kuantitas
  var jamMulai = 5
  var jamSelesai = 6
  var proses = 7 //proses
  var kegiatan = 9
  var i = 10
  var banyakRow = $('#table tbody tr').length
  var resetRow = 1
  var blnAktif = $('#bln_skp').val()
  var thnAktif = $('#thn_skp').val()

  var objKirim = {
    "tanggal": "",
    "aktifitas": "",
    "qty": "",
    "qtydd": "",
    "jam mulai": "",
    "jam selesai": "",
    "skp": "",
    "id kegiatan": ""
  }

  $('#table tbody td').each(function (e, h) {
    var tglFull, akt, qty, qtydd, mulai, selesai, klas, idkegiatan

    if (e == aktifitas) {
      akt = $(h).text()
      aktifitas += 11
      objKirim["aktifitas"] = akt
      // console.log(akt)
    }

    if (e == skp) {
      // console.log($(h).text())
      klas = klasifikasi[$(h).text()]
      skp += 11
      objKirim["skp"] = klas
      // console.log(klas)
    }

    if (e == tgl) {
      var tglMentah = $(h).text()
      //01 Apr 2022
      // console.log(tglMentah)
      var bln = ubahBulan(tglMentah.substr(3, 3))
      var tanggal = tglMentah.substr(0, 2)
      var tahun = tglMentah.substr(7, 4)

      tglFull = `${tahun}-${bln}-${tanggal}`

      tgl += 11
      objKirim["tanggal"] = tglFull
      // console.log(tglFull)
    }

    if (e == kuantitas) {
      //1 Data
      qtydd = kuant[($(h).text()).match(/[A-Za-z]+/)[0]]
      qty = ($(h).text()).match(/[0-9]+/)[0]
      kuantitas += 11
      // console.log(qty)
      // console.log(qtydd)
      objKirim["qty"] = qty
      objKirim["qtydd"] = qtydd
    }

    if (e == jamMulai) {
      var jamM = $(h).text()
      //08:30:00
      // mulai = jamM.substr(0, 5)
      mulai = "13:30"
      jamMulai += 11
      // console.log(mulai)
      objKirim["jam mulai"] = mulai
    }

    if (e == jamSelesai) {
      var jamS = $(h).text()
      // selesai = jamS.substring(0, 5)
      selesai = "15:30"
      jamSelesai += 11
      // console.log(selesai)
      objKirim["jam selesai"] = selesai
    }

    if (e == kegiatan) {
      if (mode == 'ambil') {
        console.log(($($(h).children()[0]).attr('onclick')))
        idkegiatan = ""
      } else {
        idkegiatan = ($($(h).children()[0]).attr('onclick')).match(/\((\d+)/)[1]
      }
      kegiatan += 11
      objKirim["id kegiatan"] = idkegiatan
    }

    if (e == i) {
      if (mode == 'ambil') {
        return objKirim
      } else {
        kirim(objKirim["tanggal"], objKirim["aktifitas"], objKirim["qty"], objKirim["qtydd"], objKirim["jam mulai"], objKirim["jam selesai"], objKirim["skp"], objKirim["id kegiatan"], thnAktif, blnAktif, banyakRow, resetRow, nip)
      }
      resetRow++

      i += 11
    }
  })

}

function kirim(parmTgl, parmAktifitas, parmKuantitas, parmDd, parmJamMulai, parmJamSelesai, parmKinerja, parmIdKegiatan, parmThnAktif, parmBlnAktif, parmBanyakRow, parmResetRow, parmNip) {
  // https://sitpp.pareparekota.go.id/c_aktifitas/aksi_tambah_skp_30
  let urlTambah = `${proto}//sitpp.pareparekota.go.id/c_aktifitas/aksi_tambah_skp_30`

  let jamMT = "08:30"
  let jamST = "12:00"
  let jamMU = "13:30"
  let jamSU = "15:30"

  if (nipStafSekolah) {
    nipStafSekolah.forEach(va => {
      if (parmNip == va) {
        jamMT = "07:00"
        jamST = "09:00"
        jamMU = "09:30"
        jamSU = "13:00"
      }
    })
  }


  // { "id_opmt_aktifitas_30": "0", 
  // "tanggal": "2024-01-31", 
  // "aktifitas": "Melayani masyarakat dalam hal surat pengantar izin keramaian", 
  // "kuantitas": "1", 
  // "id_dd_kuantitas": "80", 
  // "jam_mulai": "07:30", 
  // "jam_selesai": "16:00", 
  // "id_opmt_kinerja_utama_detail": "6463" }

  let payloadTambah = {
    "id_opmt_aktifitas_30": "0",
    "tanggal": parmTgl,
    "aktifitas": parmAktifitas,
    "kuantitas": parmKuantitas,
    "id_dd_kuantitas": parmDd,
    "jam_mulai": jamMT,
    "jam_selesai": jamST,
    "id_opmt_kinerja_utama_detail": parmKinerja
  }

  let payloadUbah = {
    "id_opmt_aktifitas_30": parmIdKegiatan,
    "tanggal": parmTgl,
    "aktifitas": parmAktifitas,
    "kuantitas": parmKuantitas,
    "id_dd_kuantitas": parmDd,
    "jam_mulai": jamMU,
    "jam_selesai": jamSU,
    "id_opmt_kinerja_utama_detail": parmKinerja
  }

  // console.log(payload)
  $('#loadingModal').modal('show')
  fetch(urlTambah, {
    method: 'POST',
    body: JSON.stringify(payloadTambah),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }).then(res => {
    return res.text()
  }).then(resp => {
    fetch(urlTambah, {
      method: 'POST',
      body: JSON.stringify(payloadUbah),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(resubah => {
      console.log(resubah.status)
      if (resubah.status == '200') {
        console.log(parmResetRow)
        if (parmResetRow == parmBanyakRow) {
          $('#loadingModal').modal('hide')
        }
      }
      return resubah.text()
    }).then(respubah => {
      console.log(respubah)
      cari_skp()
    }).catch(err => {
      alert(err)
      $('#loadingModal').modal('hide')
    })
  }).catch(errr => {
    alert(errr)
    $('#loadingModal').modal('hide')
  })
}

function tambahbaru() {
  let ok = confirm("Yakin jeki besti?")

  if (!ok) {
    return
  }

  let urlTambah = `${proto}//sitpp.pareparekota.go.id/c_aktifitas/aksi_tambah_skp_30`

  // if (location.protocol == 'https:') {
  //   urlTambah = "https://sitpp.pareparekota.go.id/c_aktifitas/aksi_tambah_skp_30"
  // }

  $('#loadingModal').modal('show')
  fetch(`${gs}?nip=${nip}&mode=import`)
    .then(res => {
      return res.text()
    })
    .then(resp => {
      let hasil = JSON.parse(resp)
      if (hasil.pesan == 'sheet belum ada') {
        $('#loadingModal').modal('hide')
        alert('SHEET BELUM ADA')
        return false
      }
      console.log(hasil)
      hasil.forEach(bkn => {
        fetch(urlTambah, {
          method: 'POST',
          body: JSON.stringify(bkn),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(res => {
          return res.text()
        }).then(resp => {
          $('#loadingModal').modal('hide')
        }).catch(errr => {
          $('#loadingModal').modal('show')
          alert(errr)
        })
      });
      alert("Berhasil...")
      cari_skp()
    }).catch(err => {
      $('#loadingModal').modal('hide')
      alert(err)
    })
}

function duplikat() {
  let pilihanBulan = `
  <div>
  <table class="tbl_par_aktifitas" id="duplikat">
    <tbody>
    <tr>
    <td>Bulan</td>
    <td>
    <select class="form-control">
    <option value="1">JANUARI</option>
    <option value="2">FEBRUARI</option>
    <option value="3">MARET</option>
    <option value="4">APRIL</option>
    <option value="5">MEI</option>
    <option value="6">JUNI</option>
    <option value="7">JULI</option>
    <option value="8">AGUSTUS</option>
    <option value="9">SEPTEMBER</option>
    <option value="10">OKTOBER</option>
    <option value="11">NOVEMBER</option>
    <option value="12">DESEMBER</option>
    </select>
    </td>
    <td>Tahun</td>
    <td><input type="text" class="form-control" value="2022"></td>
    </tr>
    </tbody>
  </table>
  </div>`

  let modalDuplikat = modalCustom(pilihanBulan, 'Pilih tujuan');

  if (!$('#modalCustom')[0]) {
    $('body').prepend(modalDuplikat)
  }

  $('#modalCustom').modal('show')

  $('#modalCustom button:eq(2)').click(() => {
    ambil_skp()
  })
}


function ambil_skp() {
  var bln = $('#duplikat select').val();
  var thn = $('#duplikat input').val();

  $.post('c_aktifitas/cari_skp_30', {
    bln: bln,
    thn: thn
  }, function (res) {
    let isitabel = kinerjahack('ambil')
    console.log(isitabel)
  });
}
